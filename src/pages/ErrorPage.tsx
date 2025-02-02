import { useRouteError, isRouteErrorResponse } from "react-router";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div style={{ textAlign: "center", padding: "50px" , color: 'red'}}>
            <h1>Oops! Something went wrong.</h1>

            {isRouteErrorResponse(error) ? (
                <div>
                    <h2>{error.status} - {error.statusText}</h2>
                    <p>{error.data?.message || "An unexpected error occurred."}</p>
                </div>
            ) : (
                <div>
                    <h2>Unexpected Error</h2>
                    <p>{error instanceof Error ? error.message : "Unknown error occurred."}</p>
                </div>
            )}

            <a href="/" style={{ display: "block", marginTop: "20px", fontSize: "18px" }}>
                Go Back to Home
            </a>
        </div>
    );
};

export default ErrorPage;
