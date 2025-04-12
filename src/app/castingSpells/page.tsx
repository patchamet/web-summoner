'use client'

import React, { useState, useEffect } from 'react'

type ElementNode = {
    _id: string;
    _parentId: string | null;
    htmlTag: string;
    props: Record<string, string>;
    style: Record<string, string>;
    innerHTML?: string | null;
    children?: ElementNode[];
    value?: string | null | any;
};

const elementNodes: ElementNode[] = [
    {
        _id: '0',
        _parentId: null,
        htmlTag: 'div',
        props: {},
        style: {
            width: '100%',
            height: '300px',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            padding: '8px',
            display: 'flex',
            flexDirection: 'rows',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        innerHTML: null,
    },
    {
        _id: '1.1',
        _parentId: '0',
        htmlTag: 'div',
        props: {},
        style: {
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            padding: '8px',
            width: '50%',
            height: '100%',
        },
        innerHTML: null,
    },
    {
        _id: '1.1.1',
        _parentId: '1.1',
        htmlTag: 'h1',
        props: {},
        style: {
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
        },
        innerHTML: 'h1: 1.1.1',
    },
    {
        _id: '1.1.2',
        _parentId: '1.1',
        htmlTag: 'h2',
        props: {},
        style: {
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
        },
        innerHTML: 'h2: 1.1.2',
    },
    {
        _id: '1.2',
        _parentId: '0',
        htmlTag: 'div',
        props: {},
        style: {
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            padding: '8px',
            width: '50%',
            height: '100%',
        },
        innerHTML: null,

    },
    {
        _id: '1.2.1',
        _parentId: '1.2',
        htmlTag: 'div',
        props: {},
        style: {
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            padding: '8px',
        },
        innerHTML: null,
    },
    {
        _id: '1.2.1.1',
        _parentId: '1.2.1',
        htmlTag: 'p',
        props: {},
        style: {
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
        },
        innerHTML: 'p: 1.2.1.1',
    },
    {
        _id: '1.2.2',
        _parentId: '1.2',
        htmlTag: 'div',
        props: {},
        style: {
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            padding: '8px',
        },
        innerHTML: null,
    },
    {
        _id: 'horizontal-container',
        _parentId: '1.2.2',
        htmlTag: 'div',
        props: {},
        style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
        },
        innerHTML: null,
    },
    {
        _id: 'input-1',
        _parentId: 'horizontal-container',
        htmlTag: 'input',
        props: {},
        style: {
            color: 'black',
            backgroundColor: 'white',
            textAlign: 'center',
        },
        value: 'input-1 value',
    },
    {
        _id: 'input-2',
        _parentId: 'horizontal-container',
        htmlTag: 'input',
        props: {},
        style: {
            color: 'black',
            backgroundColor: 'white',
            textAlign: 'center',
        },
        value: 'input-2 value',
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

const ElementRenderer = ({
    node,
}: {
    node: ElementNode;
}): React.ReactElement => {
    const renderChildren = Array.isArray(node.children) && node.children.length > 0
        ? node.children.map(child => ElementRenderer({ node: child }))
        : node.innerHTML || undefined

    const RenderHtmlElement = React.createElement(
        node.htmlTag,
        {
            key: node._id,
            style: node.style,
            ...node.props,
        },
        renderChildren,
    );
    return RenderHtmlElement;
}


const CastingSpells = () => {
    const [flatItems, setFlatItems] = useState<ElementNode[]>([]);
    const [treeObject, setTreeObject] = useState<ElementNode | null>(null);

    useEffect(() => {
        setFlatItems(elementNodes);
    }, []);

    useEffect(() => {
        const formattedTree = toTreeObject(flatItems);
        setTreeObject(formattedTree);
    }, [flatItems]);

    return treeObject
        ? <ElementRenderer node={treeObject} />
        : <div>No render data</div>;
}



export default CastingSpells;