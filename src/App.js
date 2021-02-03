import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import { ErrorBoundary } from 'react-error-boundary';

import coronaImage from './images/image.png';

function ErrorFallback() {
    return (
        <div className={styles.container}>
            <h1>ERROR 500</h1>
            <p>If you are seeing this, there is probably something wrong with the API.</p>
        </div>
    )
  }

class App extends React.Component {
state = {
    data: {},
    country: '',
}
    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country});
    }
    render() {
        const { data, country } = this.state;

        return (
            <ErrorBoundary FallbackComponent = {ErrorFallback}>
                <div className = {styles.container}>
                    <img className={styles.image} src = {coronaImage} alt="COVID-19"/>
                    <Cards data = { data } />
                    <CountryPicker handleCountryChange={this.handleCountryChange}/>
                    <Chart data={data} country={country}/>
                </div>
            </ErrorBoundary>
        )
    }
}

export default App;
