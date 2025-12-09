const LoadingBar = ({ progress }) => (
    <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        <style jsx>{`
            .loading-bar-container {
                width: 100%;
                background-color: #ddd;
                border-radius: 5px;
                height: 20px;
            }
            
            .loading-bar {
                height: 100%;
                background-color: #3498db; // Change the color as needed
                border-radius: 5px;
                transition: width 0.4s ease-in-out;
            }
        `}</style>
    </div>
);

export default LoadingBar;