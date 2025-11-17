import "./css/Stats.scss"

export default function Stats(){
    return (
    <div className="stats-row">
        <div className="stat-element">
            <span className="stat-value">2,900+</span>
            <span className="stat-label">nights of shelter provided so far this year</span>            
        </div>
        <div className="stat-element">
            <span className="stat-value">270+</span>
            <span className="stat-label">emergency calls responded to this month</span>            
        </div>
        <div className="stat-element">
            <span className="stat-value">1,100+</span>
            <span className="stat-label">counselling sessions delivered</span>            
        </div>
        <div className="stat-element">
            <span className="stat-value">92%</span>
            <span className="stat-label">of donations go directly to services</span>            
        </div>                        
    </div>
    )
} 