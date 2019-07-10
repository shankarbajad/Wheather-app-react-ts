var React = require('react')

export default class ResultTable extends React.Component<{}>{
	decideWheatherIcon(wheatherType: any){
		var Wtype = ''
		var isWnotExist = false
		
		switch(wheatherType){
			case 'Clear':
				Wtype =  require('../../images/clear.png')
			break

			case 'Clouds':
				Wtype =  require('../../images/cloud.png')
			break

			case 'Rain':
				Wtype =  require('../../images/rain.png')
			break

			default: 
			isWnotExist = true
			Wtype = wheatherType
		}

		if(isWnotExist){
			return(
				<div>
					{wheatherType}
				</div>
			)
		}else{
			return(
				<img src={Wtype} />
			)
		}
	}

	render(){
	return(
		<div style={{marginTop: 50}}>
			{
				this.props.wheatherInfo && this.props.wheatherInfo.length > 0 ? 
					<table className="table table-hover">
					  <thead className="thead-dark">
					    <tr key='a'>
					      <th scope="col">#</th>
					      <th scope="col">Date</th>
					      <th scope="col">Wheather</th>
					      <th scope="col">Min</th>
					      <th scope="col">Max</th>
					      <th scope="col">Humidity</th>
					    </tr>
					  </thead>
						{
							this.props.wheatherInfo.map((info: any,index: any)=>{
								debugger
							return(
									  <tbody>
									    <tr key={index}>
									      <th scope="row">{index + 1}</th>
									      <td>{info.dt_txt}</td>
									      <td>{ this.decideWheatherIcon(info.weather[0].main) }</td>
									      <td>{ (parseFloat(info.main.temp_min) -273.15).toFixed(2).toString() }°C</td>
									      <td>{ (parseFloat(info.main.temp_max) - 273.15).toFixed(2).toString()}°C</td>
									      <td>{ info.main.humidity.toString() }%</td>
									    </tr>
									  </tbody>
							)
						})
					}
				</table>
				:null
			}
	</div>
	)	
	}
}