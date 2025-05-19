(async () => {
    function eq(a, b) {
        a = Object.entries(a);
        a.sort();
        b = Object.entries(b);
        b.sort();
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function replace(source, tag, content) {
        let lines = source.split("\n");
        let begin = `<!--${tag}:begin-->`;
        let end = `<!--${tag}:end-->`;

        let beginLine, endLine;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] == begin) beginLine = i;
            if (lines[i] == end) endLine = i;
        }

        if (beginLine == undefined || endLine == undefined)
            throw new Error(`tag "${tag}" not found`);

        let out = lines
            .slice(0, beginLine + 1)
            .concat(content.split("\n"))
            .concat(lines.slice(endLine));
        return out.join("\n");
    }

    const fs = require("fs").promises;
    let repo = require("./index.json");

    for (let entry of Object.values(repo)) {
        try {
            entry.meta = await (await fetch(entry.package)).json();
        } catch (ignored) {}
    }

    let badEntries = {};
    let goodEntries = {};

    let packages = "";

    Object.entries(repo).forEach(([name, entry]) => {
        if (entry.meta == undefined)
            badEntries[name] = `Dead package: could not fetch package.json`;
        if (entry.meta.name != name)
            badEntries[name] =
                `Name mismatch: repo name is ${name} but claims it is ${entry.meta.name}`;
        if (entry.meta.dependencies == undefined)
            badEntries[name] = `Missing field: dependencies`;
        if (
            !Array.isArray(entry.meta.authors) ||
            entry.meta.authors.length == 0
        )
            badEntries[name] = `No authors: package has no authors`;
        else goodEntries[name] = true;
    });

    let removedCount = 0;
    do {
        Object.keys(goodEntries).forEach((name) => {
            if (
                Object.keys(repo[name].meta.dependencies).some(
                    (dep) => !goodEntries[dep],
                )
            ) {
                delete goodEntries[name];
                badEntries[name] =
                    "Missing dependency: one or more dependencies is not on repo";
                removedCount++;
            }
        });
    } while (removedCount != 0);

    fs.writeFile("./badEntries.json", JSON.stringify(badEntries, null, 2));

    Object.values(repo)
        .filter((entry) => goodEntries[entry.meta.name])
        .sort((a, b) => a.meta.name.localeCompare(b.meta.name))
        .forEach((entry) => {
            let authors = entry.meta.authors.map(escapeHtml);
            packages += `### ${entry.meta.name}\n`;
            packages +=
                `${entry.meta.repository ? `[**Source**](${entry.meta.repository}) | ` : ""}` +
                `${entry.meta.homepage ? `[**Home page**](${entry.meta.homepage}) | ` : ""}` +
                `[**Download**](${entry.zip}) | ` +
                `***by${authors
                    .slice(0, -1)
                    .map((s) => ` ${s}`)
                    .join(
                        ",",
                    )}${authors.length > 1 ? " and" : ""} ${authors[entry.meta.authors.length - 1]}***\n`;
            packages += "\n";
            packages += `\`\`\`\n/pully install ${entry.meta.name}\n\`\`\`\n`;
            packages += "\n";
            packages += escapeHtml(entry.meta.description);
            packages += "\n";
            if (!eq(entry.meta.dependencies, {}))
                packages += `- Depends on: ${Object.entries(
                    entry.meta.dependencies,
                )
                    .map(
                        ([name, version]) =>
                            `**[${name}](#${name})**(${version})`,
                    )
                    .join(", ")}\n`;
            if ((entry.meta.javaDependencies ?? []).length != 0)
                packages += `- Java dependencies: ${entry.meta.javaDependencies.join(", ")}\n`;
            if ((entry.meta.keywords ?? []).length != 0)
                packages += `- Keywords: ${entry.meta.keywords.join(", ")}`;
            packages += "\n";
            packages += "\n";
        });

    let badPackages = "";

    Object.entries(badEntries).forEach(([name, reason]) => {
        badPackages +=
            `- ` + repo[name].meta.repository
                ? `[**${name}**](${repo[name.meta.repository]})`
                : `**${name}**` + ` (${reason})\n`;
    });

    if (packages.length == 0) packages = "*[no packages]*";
    if (badPackages.length == 0) badPackages = "*[no bad packages]*";

    let readme = await fs.readFile("./README.md", "utf8");
    readme = replace(readme, "listing", packages.trim());
    readme = replace(readme, "badpacks", badPackages.trim());
    fs.writeFile("./README.md", readme);
})();
