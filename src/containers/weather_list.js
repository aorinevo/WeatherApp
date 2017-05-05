import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';


class WeatherList extends Component {
  
  renderWeather( cityData ) {
    var temperature =[], 
        pressure = [], 
        humidity = [];
    
    const {lon, lat} = cityData.city.coord;
    
    cityData.list.forEach( item => {
      temperature.push(item.main.temp);
      pressure.push(item.main.pressure);
      humidity.push(item.main.humidity);
    });
    
    return (
      <tr key={cityData.city.id}>
        <td>
          <span>{ cityData.city.name }</span>
          <GoogleMap lon={lon} lat={lat} />
        </td>
        <td><Chart data={temperature} color="red" units="K"/></td>
        <td><Chart data={pressure} color="green" units="hPa"/></td>
        <td><Chart data={humidity} color="yellow" units="%"/></td>
      </tr>
    );
  }
  render() {
    return (
      <table className='table table-hover'>
        <thead>
          <tr><th>City</th><th>Temperature (K)</th><th>Pressure (hPa)</th><th>Humidity(%)</th></tr>
        </thead>
        <tbody>
          {this.props.weather.map( this.renderWeather )}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps( { weather }){
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);