import React, { useState, useEffect } from 'react';

interface UserProps {
  name: string;
  age: number;
  email?: string;
}

interface UserState {
  isActive: boolean;
  lastLogin: Date;
}

type UserStatus = 'online' | 'offline' | 'away';

const TestComponent: React.FC<UserProps> = ({ name, age, email }) => {
  const [state, setState] = useState<UserState>({
    isActive: false,
    lastLogin: new Date()
  });

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const handleClick = () => {
    setState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  return (
    <div onClick={handleClick}>
      <h1>Hello {name}</h1>
      <p>Age: {age}</p>
      {email && <p>Email: {email}</p>}
      <p>Status: {state.isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

function useUserStatus(userId: string): [UserStatus, (status: UserStatus) => void] {
  const [status, setStatus] = useState<UserStatus>('offline');

  useEffect(() => {
    // Simulate API call
    setStatus('online');
  }, [userId]);

  return [status, setStatus];
}

export default TestComponent;
export { useUserStatus };
