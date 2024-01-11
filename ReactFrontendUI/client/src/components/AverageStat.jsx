const AverageStat = (props) => {
    if (props.data == null) {
        return <p>no Data</p>
    }
    const Values = props.data.map(entry => entry[props.stat]);
    const average = Values.reduce((sum, value) => sum + value, 0) / Values.length;
    return (
      <div>
        <p>{average.toFixed(2)} {props.sign}</p>
      </div>
    );
};
  
export default AverageStat;