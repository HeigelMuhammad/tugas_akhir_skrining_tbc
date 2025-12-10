import React from 'react';

export const Form = ({ children, ...props }) => {
  return (
    <form {...props}>
      {children}
    </form>
  );
};

export const FormControl = ({ children }) => {
  return <div className="form-control">{children}</div>;
};

export const FormField = ({ control, name, render }) => {
  return (
    <div className="form-field">
      {render({ field: control[name] })}
    </div>
  );
};

export const FormItem = ({ children }) => {
  return <div className="form-item">{children}</div>;
};

export const FormLabel = ({ children }) => {
  return <label className="form-label">{children}</label>;
};

export const FormMessage = ({ children }) => {
  return <div className="form-message">{children}</div>;
};