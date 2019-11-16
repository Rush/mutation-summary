interface StringMap<T> {
    [key: string]: T;
}
declare class NodeMap<T> {
    private static ID_PROP;
    private static nextId_;
    private nodes;
    private values;
    constructor();
    private isIndex;
    private nodeId;
    set(node: Node, value: T): void;
    get(node: Node): T;
    has(node: Node): boolean;
    delete(node: Node): void;
    keys(): Node[];
}
/**
 *  var reachableMatchableProduct = [
 *  //  STAYED_OUT,  ENTERED,     STAYED_IN,   EXITED
 *    [ STAYED_OUT,  STAYED_OUT,  STAYED_OUT,  STAYED_OUT ], // STAYED_OUT
 *    [ STAYED_OUT,  ENTERED,     ENTERED,     STAYED_OUT ], // ENTERED
 *    [ STAYED_OUT,  ENTERED,     STAYED_IN,   EXITED     ], // STAYED_IN
 *    [ STAYED_OUT,  STAYED_OUT,  EXITED,      EXITED     ]  // EXITED
 *  ];
 */
declare enum Movement {
    STAYED_OUT = 0,
    ENTERED = 1,
    STAYED_IN = 2,
    REPARENTED = 3,
    REORDERED = 4,
    EXITED = 5
}
declare class NodeChange {
    node: Node;
    childList: boolean;
    attributes: boolean;
    characterData: boolean;
    oldParentNode: Node;
    added: boolean;
    private attributeOldValues;
    characterDataOldValue: string;
    isCaseInsensitive: boolean;
    constructor(node: Node, childList?: boolean, attributes?: boolean, characterData?: boolean, oldParentNode?: Node, added?: boolean, attributeOldValues?: StringMap<string>, characterDataOldValue?: string);
    getAttributeOldValue(name: string): string;
    getAttributeNamesMutated(): string[];
    attributeMutated(name: string, oldValue: string): void;
    characterDataMutated(oldValue: string): void;
    removedFromParent(parent: Node): void;
    insertedIntoParent(): void;
    getOldParent(): Node;
}
declare class ChildListChange {
    added: NodeMap<boolean>;
    removed: NodeMap<boolean>;
    maybeMoved: NodeMap<boolean>;
    oldPrevious: NodeMap<Node>;
    moved: NodeMap<boolean>;
    constructor();
}
declare class MutationProjection {
    rootNode: Node;
    mutations: MutationRecord[];
    selectors: Selector[];
    calcReordered: boolean;
    calcOldPreviousSibling: boolean;
    private treeChanges;
    private entered;
    private exited;
    private stayedIn;
    private visited;
    private childListChangeMap;
    private characterDataOnly;
    private matchCache;
    constructor(rootNode: Node, mutations: MutationRecord[], selectors: Selector[], calcReordered: boolean, calcOldPreviousSibling: boolean);
    processMutations(): void;
    visitNode(node: Node, parentReachable: Movement): void;
    ensureHasOldPreviousSiblingIfNeeded(node: Node): void;
    getChanged(summary: Summary, selectors: Selector[], characterDataOnly: boolean): void;
    getOldParentNode(node: Node): Node;
    getOldPreviousSibling(node: Node): Node;
    getOldAttribute(element: Node, attrName: string): string;
    attributeChangedNodes(includeAttributes: string[]): StringMap<Element[]>;
    getOldCharacterData(node: Node): string;
    getCharacterDataChanged(): Node[];
    computeMatchabilityChange(selector: Selector, el: Element): Movement;
    matchabilityChange(node: Node): Movement;
    getChildlistChange(el: Element): ChildListChange;
    processChildlistChanges(): void;
    wasReordered(node: Node): boolean;
}
export declare class Summary {
    private projection;
    added: Node[];
    removed: Node[];
    reparented: Node[];
    reordered: Node[];
    valueChanged: Node[];
    attributeChanged: StringMap<Element[]>;
    characterDataChanged: Node[];
    constructor(projection: MutationProjection, query: Query);
    getOldParentNode(node: Node): Node;
    getOldAttribute(node: Node, name: string): string;
    getOldCharacterData(node: Node): string;
    getOldPreviousSibling(node: Node): Node;
}
declare class Qualifier {
    attrName: string;
    attrValue: string;
    contains: boolean;
    constructor();
    matches(oldValue: string): boolean;
    toString(): string;
}
declare class Selector {
    private static nextUid;
    private static matchesSelector;
    tagName: string;
    qualifiers: Qualifier[];
    uid: number;
    private get caseInsensitiveTagName();
    get selectorString(): string;
    constructor();
    private isMatching;
    private wasMatching;
    matchabilityChange(el: Element, change: NodeChange): Movement;
    static parseSelectors(input: string): Selector[];
}
export interface Query {
    element?: string;
    attribute?: string;
    all?: boolean;
    characterData?: boolean;
    elementAttributes?: string;
    attributeList?: string[];
    elementFilter?: Selector[];
}
export interface Options {
    callback: (summaries: Summary[]) => any;
    queries: Query[];
    rootNode?: Node;
    oldPreviousSibling?: boolean;
    observeOwnChanges?: boolean;
}
export declare class MutationSummary {
    static NodeMap: typeof NodeMap;
    static parseElementFilter: typeof Selector.parseSelectors;
    static createQueryValidator: (root: Node, query: Query) => any;
    private connected;
    private options;
    private observer;
    private observerOptions;
    private root;
    private callback;
    private elementFilter;
    private calcReordered;
    private queryValidators;
    private static optionKeys;
    private static createObserverOptions;
    private static validateOptions;
    private createSummaries;
    private checkpointQueryValidators;
    private runQueryValidators;
    private changesToReport;
    constructor(opts: Options);
    private observerCallback;
    reconnect(): void;
    takeSummaries(): Summary[];
    disconnect(): Summary[];
}
export {};
