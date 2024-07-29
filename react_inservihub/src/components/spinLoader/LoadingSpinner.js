import {ClipLoader} from "react-spinners";

function LoadingSpinner() {
    return (
        <>
            <ClipLoader
                color={'#e4074e'}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </>
    );
}

export default LoadingSpinner;