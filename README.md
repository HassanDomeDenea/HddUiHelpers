# hdduihelpers

To add to your project

```bash
git submodule add https://github.com/HassanDomeDenea/HddUiHelpers.git resources/js/HddUiHelpers
```

When pulling: 

```bash
git pull --recurse-submodules
```

When pushing:

```bash

# Commit the submodule changes
git -C ./resources/js/HddUiHelpers add .
git -C ./resources/js/HddUiHelpers commit -m "New Updates"

# Commit the main repo to update submodule reference
git add resources/js/HddUiHelpers
git commit -m "Update HddUiHelpers submodule"

# Push everything in one go
git push --recurse-submodules=on-demand
```
