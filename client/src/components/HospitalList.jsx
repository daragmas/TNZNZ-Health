const HostpitalList = ({hospitals, hospitalClick})=>{
    return (
        <div className="hopitals-list">
            {hospitals?.map((hospital, index) => {
                return (
                    <div className="hospital-card" key={hospital.id}>
                        <h3 id={index} onClick={hospitalClick}>
                            {hospital.hospital_system}
                        </h3>
                        <small>{hospital.address}</small>
                    </div>
                );
            })}
        </div>
    );

}

export default HostpitalList