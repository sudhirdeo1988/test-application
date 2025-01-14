import React, { Component } from "react";
import { Result } from "antd";

class ErrorBoundary extends Component {
  state = { hasError: false, reloadCount: 0 };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (
      process.env.NODE_ENV === "production" &&
      (error?.message?.indexOf("loading chunk") !== -1 ||
        error?.message?.indexOf("Loading CSS chunk") !== -1) &&
      this.state.reloadCount < 2
    ) {
      window.location.reload();
    } else {
      console.error(error, errorInfo);
    }
  }
  render() {
    const { children, ...rest } = this.props;

    if (this.state.hasError) {
      return (
        <Result
          status="warning"
          title="There are some problems with your operation."
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
