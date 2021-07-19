
const Feedback = ({type, children}) => {
    
    const dataTypesColors = {
        error: "#f33",
        success: "lime",
        info: "cyan"
    }

    return (
        <p className="feedback" style={{color: dataTypesColors[type]}}>{children}</p>
    )
}

export default Feedback