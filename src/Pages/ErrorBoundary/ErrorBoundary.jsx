import React, { Component } from "react";
import { Result, Button } from "antd";

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
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button
              type="primary"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back To Dashboard
            </Button>
          }
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
