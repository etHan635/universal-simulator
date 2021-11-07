# universal-simulator

##Address System
Placing '@' at the start of a string indicates that it is an address
If the address is like '@/foo/bar/biz', then the system finds biz starting from the root node.
If the address is like '@foo/bar/biz', then the system finds biz relative to a given node.

The system now also supports moving to the parent of a given *non-primitive* node.
If the address is like '@../../foo/bar/biz', then the system finds foo/bar/biz starting from the grandparent of the current node.
