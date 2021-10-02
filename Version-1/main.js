const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJoZXJuYW5kZXphbGV4MjE0MEBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJMQXVZdVNmenoxY0xsT1czY2RPYVhxRl9IR210UHNCeVJ2OXpHMWR2RFdxS1pxdWFUTkh0VjhGbThiNUdSMlpaS1hjIn0sImV4cCI6MTYzMzIyNTEwMH0.KtnijbP1JVeSy5EbVXBQvi6UyWcrSN4cYSIsMCa-f2I";


const selectComponent = Vue.component('select-component', {
    props: ['selectedCountry', 'selectedState', 'selectedCity', 'countries', 'states', 'cities', 'clearValues'],
    template: `<div class="container">
                    <div class="outer-row">
                        <div class="col">
                            <div class="row">
                                <select
                                    id="countrySelector"
                                    class="defaultSelect"
                                    v-model="selectedCountry">
                                    <option
                                        value=""
                                        selected="selected"
                                        hidden="hidden">
                                        Select
                                        Country</option>
                                    <option
                                        v-for="country in countries">{{country}}</option>
                                </select>
                            </div>
                            <div class="row">
                                <select
                                    id="stateSelector"
                                    class="defaultSelect"
                                    v-model="selectedState">
                                    <option
                                        value=""
                                        selected="selected"
                                        hidden="hidden">
                                        Select
                                        State</option>
                                    <option
                                        v-for="state in states">{{state}}</option>
                                </select>
                            </div>
                            <div class="row">
                                <select
                                    id="citySelector"
                                    v-model="selectedCity"
                                    name="citySelector"
                                    v-if="selectedState &&
                                    cities.length != 0"
                                    multiple>
                                    <option
                                        value=""
                                        selected="selected"
                                        hidden="hidden">
                                        Select
                                        City</option>
                                    <option
                                        v-for="city in cities">{{city}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <button id="clearBttn" @click="clearValues()">Clear</button>
                            <h3 class="loadStatus" v-if="selectedCountry &&
                                states.length == 0">Loading..</h3>
                            <h3 class="loadStatus" v-if="selectedCountry &&
                                states.length != 0">Done!</h3>
                            <h3 id="loadingCityIcon" class="loadStatus" v-if="selectedState &&
                                cities.length == 0">Loading..</h3>
                            <h3 id="noCitiesText" class="loadStatus"></h3>
                            <div id="cityDoneContainer" class="loadStatus"
                                v-if="selectedState &&
                                cities.length != 0">
                                <h3 v-if="selectedCity.length == 0"> Number of Cities Selected: {{selectedCity.length}}</h3>
                                <h3 v-if="selectedCity.length >= 1"> Number of Cities Selected: {{selectedCity.length - 1}}</h3>
                                <input value="Select All" type="radio" @click="selectAll()" v-model="picked">Select All</input>
                                <input value="De-Select All" type="radio" @click="unselectAll()" v-model="picked">De-Select All</input>
                                <p>For windows: Hold down the control (ctrl)
                                    button to select multiple options
                                </p>
                                <p>For Mac: Hold down the command button to
                                    select multiple options</p>
                            </div>
                        </div>
                    </div>`,

                    computed: {
                        picked: '',
                        selectedCountry: '',
                        selectedState: '',
                        selectedCity: '',
                        countries: [],
                        states: [],
                        cities: []
                    },

                    beforeCreate: function(){
                        const getCountriesUrl = 'https://www.universal-tutorial.com/api/countries/';
                        axios.get(getCountriesUrl, {
                            headers: {
                                "Authorization": "Bearer " + authToken,
                                "Accept": "application/json"
                            }
                        })
                            .then(response => this.displayCountries(response))
                        },
                
                        watch: {
                            selectedCountry: function(selectedCountry){
                
                                this.states = [];
                                this.cities = [];
                
                                this.selectedState = '';
                                this.selectedCity = '';
                
                                const noCityText = document.getElementById('noCitiesText');
                                noCityText.innerHTML = '';
                
                                    const getStatesUrl = 'https://www.universal-tutorial.com/api/states/' + selectedCountry;
                                    axios.get(getStatesUrl, {
                                        headers: {
                                            "Authorization": "Bearer " + authToken,
                                            "Accept": "application/json"
                                        }
                                    })
                                    .then(response => this.displayStates(response));
                            },
                
                            selectedState: function(selectedState){
                                this.cities = [];
                                this.selectedCity = '';
                
                                const getCitiesUrl = 'https://www.universal-tutorial.com/api/cities/' + selectedState;
                                axios.get(getCitiesUrl, {
                                    headers: {
                                        "Authorization": "Bearer " + authToken,
                                        "Accept": "application/json"
                                    }
                                })
                                    .then(response => this.examineResponse(response))
                                    .then(response => this.displayCities(response));
                            }
                        },
                
                
                        methods: {
                
                            examineResponse(response){
                                const loadingCityIcon = document.getElementById('loadingCityIcon');
                                const noCityText = document.getElementById('noCitiesText');
                                if(response.data == 0){
                                    loadingCityIcon.classList.remove('visible');
                                    loadingCityIcon.classList.add('hidden');
                                    noCityText.innerHTML = 'No Cities';
                                }
                                else {
                                    loadingCityIcon.classList.remove('hidden');
                                    loadingCityIcon.classList.add('visible');
                                    return response;
                                }
                            },
                
                            displayCountries(response) {
                                const data = response.data;
                                console.log(this.countries);
                                for (let i = 0; i < data.length; i++) {
                                    this.countries.push(data[i]['country_name'])
                                }
                            },
                
                            displayStates(response){
                                const data = response.data;
                                for(let i = 0; i < data.length; i++){
                                    this.states.push(data[i]['state_name'])
                                }
                            },
                
                            displayCities(response){
                                const data = response.data;
                                for(let i = 0; i < data.length; i++){
                                    this.cities.push(data[i]['city_name'])
                                }
                            },
                
                            clearValues() {
                                this.selectedCountry = '';
                                this.selectedState = '';
                                this.selectedCity = '';
                            },
                
                            selectAll(){
                                this.selectedCity = this.cities;
                            },
                
                            unselectAll(){
                                this.selectedCity = '';
                                const citySelector = document.getElementById('citySelector');
                                citySelector.value = '';
                            }
                        },
                
},)

const vm = new Vue({
    el: '#app',
    components: {
        'selectComponent':selectComponent
    },
    data: {
        picked: '',
        selectedCountry: '',
        selectedState: '',
        selectedCity: '',
        countries: [],
        states: [],
        cities: []
    },

    beforeCreate: function(){
        const getCountriesUrl = 'https://www.universal-tutorial.com/api/countries/';
        axios.get(getCountriesUrl, {
            headers: {
                "Authorization": "Bearer " + authToken,
                "Accept": "application/json"
            }
        })
            .then(response => this.displayCountries(response))
        },

        watch: {
            selectedCountry: function(selectedCountry){

                this.states = [];
                this.cities = [];

                this.selectedState = '';
                this.selectedCity = '';

                const noCityText = document.getElementById('noCitiesText');
                noCityText.innerHTML = '';

                    const getStatesUrl = 'https://www.universal-tutorial.com/api/states/' + selectedCountry;
                    axios.get(getStatesUrl, {
                        headers: {
                            "Authorization": "Bearer " + authToken,
                            "Accept": "application/json"
                        }
                    })
                    .then(response => this.displayStates(response));
            },

            selectedState: function(selectedState){
                this.cities = [];
                this.selectedCity = '';

                const getCitiesUrl = 'https://www.universal-tutorial.com/api/cities/' + selectedState;
                axios.get(getCitiesUrl, {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "Accept": "application/json"
                    }
                })
                    .then(response => this.examineResponse(response))
                    .then(response => this.displayCities(response));
            }
        },


        methods: {

            examineResponse(response){
                const loadingCityIcon = document.getElementById('loadingCityIcon');
                const noCityText = document.getElementById('noCitiesText');
                if(response.data == 0){
                    loadingCityIcon.classList.remove('visible');
                    loadingCityIcon.classList.add('hidden');
                    noCityText.innerHTML = 'No Cities';
                }
                else {
                    loadingCityIcon.classList.remove('hidden');
                    loadingCityIcon.classList.add('visible');
                    return response;
                }
            },

            displayCountries(response) {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    this.countries.push(data[i]['country_name'])
                }
            },

            displayStates(response){
                const data = response.data;
                for(let i = 0; i < data.length; i++){
                    this.states.push(data[i]['state_name'])
                }
            },

            displayCities(response){
                const data = response.data;
                for(let i = 0; i < data.length; i++){
                    this.cities.push(data[i]['city_name'])
                }
            },

            clearValues() {
                this.selectedCountry = '';
                this.selectedState = '';
                this.selectedCity = '';
            },

            selectAll(){
                this.selectedCity = this.cities;
            },

            unselectAll(){
                this.selectedCity = '';
                const citySelector = document.getElementById('citySelector');
                citySelector.value = '';
            }
        },





})