import * as React from 'react';
import axios from 'axios';

interface Props {

}

interface State {
  city: string,
  wheatherInfo: []
}

export class App extends React.Component<Props, State>  {

  constructor(props: Props) {
    super(props);
     this.state = {
      city: 'indore,in',
      wheatherInfo: []
    }
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

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


  componentWillMount(){
    this.fetchValue(this.state.city)
  }

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(this.autocompleteInput.current,
        {
          "types": ['(cities)'],
        });

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
   const place = this.autocomplete.getPlace();
   if(place){
    this.setState({
      city: place.name + ',' +place.address_components[place.address_components.length - 1].short_name})
   }
  }

  
  fetchValue =(city: any) =>{
    let context = this
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=f7d1f075a9bdf182ca672cc9c675ada0`)
      .then(function (response: any) {
        context.setState({wheatherInfo: response.data.list})
      })
    .catch((error: any) => {
      alert('Invalid Format') 
     });
  }

  render() {
    return (
      <div className="container">
        <div style={{textAlign: 'center', fontSize: 18, fontWeight: 700, marginTop: 30}}>
          Test Wheather Forcating App
        </div>

        <div style={{marginTop: 50,fontSize: 16, fontWeight: 600}}>
          Find Wheather in your city 
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
               <div className="input-group" style={{marginTop: 30,width: '80%'}}>
                  <input 
                    type="text" 
                    className="form-control" 
                    ref={this.autocompleteInput}  
                    id="autocomplete"
                    placeholder="Search City" 
                    aria-label="Search City" 
                    aria-describedby="basic-addon1"
                    value={this.state.city}
                    onChange={(e)=>{this.setState({city: e.target.value})}}
                    // onBlur={(e)=>{this.fetchInfo(this.state.city)}}
                    />
                  <span style={{marginTop: 10, fontSize: 12}}>*use city name with country code if auto place search not working</span>
                  <span style={{fontSize: 12}}>** like (indore,in) (delhi,in)</span>
                </div>
            </div>
            <div className="col-sm">
              <div style={{marginTop: 30}}>
                 <button 
                    onClick={()=>{this.fetchValue(this.state.city)}}
                    style={{marginLeft: 15}} 
                    type="button" 
                    className="btn btn-outline-primary">
                  Get wheather Information</button>
              </div>
            </div>
          </div>
        </div>

       {/* <ResultTable
          wheatherInfo = {this.state.wheatherInfo}
        />*/}
        {
        this.state.wheatherInfo && this.state.wheatherInfo.length > 0 ? 
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
              this.state.wheatherInfo.map((info: any,index: any)=>{
              return(
                    <tbody>
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{info.dt_txt}</td>
                        <td>{ this.decideWheatherIcon(info.weather[0].main) }</td>
                        <td>{ (parseFloat(info.main.temp_min) -273.15).toFixed(2) }°C</td>
                        <td>{ (parseFloat(info.main.temp_max) - 273.15).toFixed(2)}°C</td>
                        <td>{ info.main.humidity }</td>
                      </tr>
                    </tbody>
              )
            })
          }
        </table>
        :null
      }
     </div>
    );
  }
}
