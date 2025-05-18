(async () => {
    function eq(a, b) {
        return Object.keys(a) == Object.entries(b);
    }

    const fs = require("fs").promises;
    let repo = require("./index.json");

    for (let entry of Object.values(repo)) {
        try {
            entry.meta = await (await fetch(entry.package)).json();
        } catch (ignored) {}
    }

    let badEntries = {};

    Object.entries(repo).filter(([name, entry]) => {
        if (entry.meta == undefined) {
            badEntries[name] = `Dead package: could not fetch package.json`;
            return false;
        }

        if (entry.meta.name != name) {
            badEntries[name] =
                `Name mismatch: repo name is ${name} but claims it is ${entry.meta.name}`;
            return false;
        }

        if (
            !Array.isArray(entry.meta.authors) ||
            entry.meta.authors.length == 0
        ) {
            badEntries[name] = `No authors: package has no authors`;
            return false;
        }

        return true;
    });

    let packages = "";

    Object.values(repo).forEach((entry) => {
        packages += `## ${entry.meta.name}\n`;
        packages +=
            `${entry.meta.repository ? `[**Source**](${entry.meta.repository}) | ` : ""}` +
            `${entry.meta.homepage ? `[**Home page**](${entry.meta.homepage}) | ` : ""}` +
            `[**Download**](${entry.zip}) | ` +
            `***by${entry.meta.authors
                .slice(0, -1)
                .map((s) => ` ${s}`)
                .join(
                    ",",
                )}${entry.meta.authors.length > 1 ? " and" : ""} ${entry.meta.authors[entry.meta.authors.length - 1]}***\n`;
        packages += "\n";
        packages += entry.meta.description;
        packages += "\n";
        packages += `- Depends on: ${
            eq(entry.meta.dependencies, {})
                ? `[no dependencies]`
                : Object.entries(entry.meta.dependencies)
                      .map(([name, version]) => `**${name}**(${version})`)
                      .join(", ")
        }\n`;
                // packages += `- Java dependencies: ${entry.meta}`
        packages += "\n";
    });

    fs.writeFile("./packages.md", packages);
    fs.writeFile("./badEntries.json", JSON.stringify(badEntries, null, 2));
})();
