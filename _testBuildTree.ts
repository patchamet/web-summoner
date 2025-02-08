type ElementNode = {
    _id: string;
    tag: string;
    style: Record<string, string>;
    innerHTML: string | null;
    _parentId: string | null;
    children?: ElementNode[];
};


const elementNodes: ElementNode[] = [
    {
        _id: '0',
        tag: 'div',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            padding: '8px',

        },
        innerHTML: null,
        _parentId: null,
    },
    {
        _id: '1.1',
        tag: 'div',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            padding: '8px',
        },
        innerHTML: null,
        _parentId: '0',
    },
    {
        _id: '1.1.1',
        tag: 'h1',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
        },
        innerHTML: 'Child 1.1.1',
        _parentId: '1.1',
    },
    {
        _id: '1.1.2',
        tag: 'h2',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
        },
        innerHTML: 'Child 1.1.2',
        _parentId: '1.1',
    },
    {
        _id: '1.2',
        tag: 'div',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            padding: '8px',
        },
        innerHTML: null,
        _parentId: '0',
    },

    {
        _id: '1.2.1',
        tag: 'div',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
            padding: '8px',
        },
        innerHTML: null,
        _parentId: '1.2',

    },
    {
        _id: '1.2.1.1',
        tag: 'p',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
        },
        innerHTML: 'Child 1.2.1.1',
        _parentId: '1.2.1',
    },
    {
        _id: '1.2.2',

        tag: 'div',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            padding: '8px',
        },
        innerHTML: null,
        _parentId: '1.2',
    },
    {
        _id: '1.2.2.1',
        tag: 'p',
        style: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 0, 0.5)',
        },
        innerHTML: 'Child 1.2.2.1',
        _parentId: '1.2.2',
    },
]

function toTreeObject(elements: ElementNode[]): ElementNode | null {
    const elementMap = new Map<string, ElementNode>();
    let root: ElementNode | null = null;

    // Populate the map
    elements.forEach(element => {
        element.children = [];
        elementMap.set(element._id, element);
    });

    // Build the tree
    elements.forEach(element => {
        if (element._parentId) {
            const parent = elementMap.get(element._parentId);
            if (parent) {
                parent.children?.push(element);
            }
        } else {
            root = element;
        }
    });

    return root;
}

function toFlatItems(root: ElementNode | null): ElementNode[] {
    if (!root) return [];
    const flatList: ElementNode[] = [];

    function traverse(node: ElementNode) {
        const { children, ...rest } = node;
        flatList.push(rest);
        children?.forEach(traverse);
    }

    traverse(root);
    return flatList;
}

const tree = toTreeObject(elementNodes);
// console.dir(tree, { depth: null });

const flatItems = tree ? toFlatItems(tree) : [];
console.dir(flatItems, { depth: null });