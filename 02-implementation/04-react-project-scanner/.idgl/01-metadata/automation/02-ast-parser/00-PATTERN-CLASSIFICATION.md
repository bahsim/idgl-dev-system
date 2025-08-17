# **React Pattern Classification for AST Parser**

## **Overview**
This document classifies all React patterns that the AST parser should detect, organized by category for clear implementation guidance.

## **1. Component Patterns**

### **1.1 Function Components**
```typescript
// Standard function component
function MyComponent(props: Props) { return <div>...</div> }

// Arrow function component
const MyComponent = (props: Props) => <div>...</div>

// Arrow function with explicit typing
const MyComponent: React.FC<Props> = (props) => <div>...</div>

// Arrow function with inferred typing
const MyComponent = (props: Props): JSX.Element => <div>...</div>

// Destructured props
const MyComponent = ({ prop1, prop2 }: Props) => <div>...</div>

// Default props
const MyComponent = ({ prop1 = "default" }: Props) => <div>...</div>
```

### **1.2 Class Components**
```typescript
// Standard class component
class MyComponent extends Component<Props, State> {
  render() { return <div>...</div> }
}

// Class component with lifecycle methods
class MyComponent extends Component<Props, State> {
  componentDidMount() { ... }
  componentDidUpdate() { ... }
  componentWillUnmount() { ... }
  render() { return <div>...</div> }
}
```

### **1.3 Advanced Component Patterns**
```typescript
// forwardRef with generics
const MyComponent = forwardRef<HTMLDivElement, Props>((props, ref) => 
  <div ref={ref}>...</div>
)

// React.memo with custom comparison
const MyComponent = memo<Props>((props) => <div>...</div>, (prev, next) => true)

// Higher-order components
const withHOC = <P extends object>(Component: React.ComponentType<P>) => 
  (props: P) => <Component {...props} />

// Compound components
const Compound = { 
  Item: (props: ItemProps) => <div>...</div> 
}

// Error boundaries
class ErrorBoundary extends Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { ... }
  getDerivedStateFromError(error: Error): State { ... }
  render() { return this.props.children }
}

// Suspense boundaries
<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>
```

### **1.4 JSX Patterns**
```typescript
// JSX elements
<div className="container">Content</div>

// Fragments
<>Content without wrapper</>

// Portals
ReactDOM.createPortal(children, container)

// Conditional rendering
{isVisible && <Component />}

// List rendering
{items.map(item => <Item key={item.id} {...item} />)}
```

## **2. Hook Patterns**

### **2.1 Custom Hooks**
```typescript
// Standard custom hook
function useCustomHook(param: string): [string, (value: string) => void] { ... }

// Hook with generics
function useGenericHook<T>(initial: T): [T, (value: T) => void] { ... }

// Hook with complex return types
function useComplexHook(): { 
  data: Data; 
  loading: boolean; 
  error: Error | null 
} { ... }

// Hook with conditional logic
function useConditionalHook(condition: boolean) { 
  return condition ? useHookA() : useHookB() 
}
```

### **2.2 Built-in Hooks**
```typescript
// State hooks
const [state, setState] = useState<State>(initial)
const [state, dispatch] = useReducer(reducer, initial)

// Effect hooks
useEffect(() => { ... }, [deps])
useLayoutEffect(() => { ... }, [deps])

// Context hooks
const value = useContext(MyContext)

// Ref hooks
const ref = useRef<HTMLDivElement>(null)
useImperativeHandle(ref, () => ({ focus: () => {} }))

// Memoization hooks
const memoizedValue = useMemo(() => expensiveCalculation(a, b), [a, b])
const memoizedCallback = useCallback(() => { ... }, [deps])
```

## **3. TypeScript Patterns**

### **3.1 Generic Types**
```typescript
// Component with generic props
interface Props<T> { 
  data: T[]; 
  render: (item: T) => React.ReactNode 
}
function GenericComponent<T>({ data, render }: Props<T>) { ... }

// Hook with generic constraints
function useGenericState<T extends object>(initial: T): [T, (updater: Partial<T>) => void] { ... }

// Utility with complex generics
function createSelector<TState, TProps, TResult>(
  selector: (state: TState, props: TProps) => TResult
): (state: TState, props: TProps) => TResult { ... }
```

### **3.2 Union and Intersection Types**
```typescript
// Union types in props
type ButtonProps = { 
  variant: 'primary' | 'secondary'; 
  size: 'sm' | 'md' | 'lg' 
}

// Intersection types
type EnhancedProps = BaseProps & { theme: Theme } & { animation: AnimationConfig }

// Conditional types
type ConditionalProps<T> = T extends string ? { text: T } : { data: T }
```

### **3.3 Advanced TypeScript Features**
```typescript
// Template literal types
type Greeting<T extends string> = `Hello ${T}`

// Mapped types
type Readonly<T> = { readonly [P in keyof T]: T[P] }

// Type assertions
const config = { theme: 'dark' } as const
const isValid = (value: unknown): value is string => typeof value === 'string'

// Branded types
type UserId = string & { readonly brand: unique symbol }
```

## **4. State Management Patterns**

### **4.1 Local State**
```typescript
// useState patterns
const [count, setCount] = useState(0)
const [user, setUser] = useState<User | null>(null)

// useReducer patterns
const [state, dispatch] = useReducer(reducer, initialState)
```

### **4.2 Context State**
```typescript
// Context creation
const MyContext = createContext<ContextType | undefined>(undefined)

// Context provider
<MyContext.Provider value={contextValue}>
  {children}
</MyContext.Provider>

// Context consumer
const value = useContext(MyContext)
```

### **4.3 Custom State Logic**
```typescript
// Custom state hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }
  
  return [storedValue, setValue] as const
}
```

## **5. Utility Patterns**

### **5.1 Pure Functions**
```typescript
// Pure utility functions
function formatCurrency(amount: number, currency: string): string { ... }

// Generic utilities
function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T { ... }

// Type guards
function isString(value: unknown): value is string { ... }

// Factory functions
function createApiClient(config: ApiConfig): ApiClient { ... }
```

### **5.2 React Utilities**
```typescript
// Children utilities
const childrenArray = Children.toArray(children)
const hasChildren = Children.count(children) > 0

// Clone element
const clonedElement = cloneElement(element, { ...props })

// Create element
const element = createElement('div', { className: 'container' }, 'Content')
```

## **Pattern Detection Priority**

### **High Priority (Core React)**
1. Function components
2. Class components
3. Custom hooks
4. Built-in hooks
5. Basic JSX patterns

### **Medium Priority (Advanced React)**
1. forwardRef components
2. React.memo components
3. Higher-order components
4. Error boundaries
5. Context patterns

### **Low Priority (Edge Cases)**
1. Compound components
2. Suspense boundaries
3. Portal patterns
4. Advanced TypeScript features

## **Success Criteria**

### **Detection Accuracy**
- **High Priority Patterns**: 95%+ detection rate
- **Medium Priority Patterns**: 90%+ detection rate
- **Low Priority Patterns**: 85%+ detection rate

### **Type Resolution**
- **Basic Types**: 95%+ accuracy
- **Generic Types**: 90%+ accuracy
- **Advanced Types**: 85%+ accuracy

### **Pattern Classification**
- **Purpose Identification**: 90%+ accuracy
- **Complexity Analysis**: 85%+ accuracy
- **Dependency Mapping**: 85%+ accuracy
