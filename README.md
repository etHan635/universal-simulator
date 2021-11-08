# universal-simulator
This is a refactoring of QLab's universal simulator, aiming to streamline the implementation of existing functionality.

## Changes
### Decomposition
I decomposed much of the legacy code, moving it from an embedded script in minimalGame3.html into separate files, for the purpose of improving readability.

### \_parent
I added in a system which generates a \_parent field for all objects, providing the address of their parent.

### \_visualisation
I renamed 'visualisation' to try and keep a consistent and recognisable naming convention for 'metadata'.

### Addresses
I attempted to standardise how the tool deals with addresses, eliminating the need for 'isOneOfRelative', 'this', and '&'. This involved:

* Standardising address notation. All addresses should start with '@' to set them apart from strings
* This system is now **natively relative**. The path foo.bar = '@biz' will point to the (nonexistent) foo.bar.biz
* Borrowing from Unix-like representations, the user can define an **absolute path** by placing '/' at the start of an address. The path foo.bar = '@/biz' will point to <root_node>.biz 
* Using the \_parent field, I have added the ability for pathes to **point backwards**. The path foo.bar = '@../biz' will point to foo.biz

Note that this solution is somewhat lacking, as only objects support a parent field. 
At present, I get around this by resolving relative paths into absolute paths during GUI generation, but I foresee issues when having to directly access such things e.g. for transform parameters.

### Tree GUI
I significantly altered the Tree-based GUI.

* Made GUI generator compatible with the new address system.
* Hid visualisation + parent data from the tree by default, as this is primarily useful for debugging purposes rather than actually viewing the tree.
* Replaced table-based layout with nested lists. I found this to be much more easily compatible with the hierarchical data being processed, with the downside that it will have to be fully replaced for any alternative visualisations.
* Replaced button-based traversal with actual **links** for both addresses and keys. This will also help to make transforms stand out once I reimplement them.
