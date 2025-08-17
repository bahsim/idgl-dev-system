import React, { forwardRef, memo, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { observer } from 'mobx-react';

// Basic React component
const BasicComponent: React.FC<{ name: string }> = ({ name }) => {
  return <div>Hello {name}</div>;
};

// React.memo component
const MemoizedComponent = memo(BasicComponent);

// forwardRef component
const ForwardRefComponent = forwardRef<HTMLDivElement, { title: string }>((props, ref) => {
  return <div ref={ref}>{props.title}</div>;
});

// Custom HOC
const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const theme = 'dark';
    return <Component {...props} theme={theme} />;
  };
};

// Component using custom HOC
const ThemedComponent = withTheme(BasicComponent);

// Redux connected component
const ConnectedComponent = connect(
  (state: any) => ({ data: state.data }),
  (dispatch: any) => ({ fetchData: () => dispatch({ type: 'FETCH_DATA' }) })
)(BasicComponent);

// MobX observer component
const ObservedComponent = observer(() => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return <div>Count: {count}</div>;
});

// Compound component pattern
const CompoundComponent = {
  Root: ({ children }: { children: React.ReactNode }) => <div className="compound">{children}</div>,
  Header: ({ title }: { title: string }) => <header>{title}</header>,
  Body: ({ children }: { children: React.ReactNode }) => <main>{children}</main>
};

// Render prop pattern
const RenderPropComponent: React.FC<{ render: (data: string) => React.ReactNode }> = ({ render }) => {
  const data = "Sample data";
  return <div>{render(data)}</div>;
};

// Custom hook with complex types
const useCustomState = <T,>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  
  const updateValue = useCallback((newValue: T) => {
    setIsLoading(true);
    setValue(newValue);
    setIsLoading(false);
  }, []);
  
  return { value, isLoading, updateValue };
};

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    
    return this.props.children;
  }
}

// Portal component
const PortalComponent: React.FC = () => {
  return ReactDOM.createPortal(
    <div>Portal content</div>,
    document.body
  );
};

// Fragment component
const FragmentComponent: React.FC = () => {
  return (
    <>
      <div>First element</div>
      <div>Second element</div>
    </>
  );
};

export {
  BasicComponent,
  MemoizedComponent,
  ForwardRefComponent,
  ThemedComponent,
  ConnectedComponent,
  ObservedComponent,
  CompoundComponent,
  RenderPropComponent,
  useCustomState,
  ErrorBoundary,
  PortalComponent,
  FragmentComponent
};
