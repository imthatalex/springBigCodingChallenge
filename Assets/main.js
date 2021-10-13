new Vue({
    el: '#app',
    components: {
        'MultipleSelect': MultipleSelect
    },
    data: {
        authToken: '',
        selectedCountryId: '',
        selectedCountryName: '',
        selectedStateId: '',
        selectedStateName: '',
        selectedCityId: '',
        selectedCityName: '',
        countries: [],
        states: [],
        cities: []
    },
    beforeCreate: function () {
        // generate auth token
        axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
            headers: {
                // add api token and e-mail
                "Accept": "application/json",
                "api-token": "",
                "user-email": ""
            }
        })
        // set authToken, render list of countries
        .then(response => {
            let data = response.data;
            let authToken = data['auth_token'];
            this.authToken = authToken;
            this.displayCountries(authToken);
        });
    },
    watch: {
        selectedCountryId: function(selectedCountryId){
            // clear data to avoid duplicates
            this.states = [];
            this.cities = [];
            const noCitiesText = document.getElementById('noCitiesText');
            noCitiesText.innerHTML = '';
            // set selected country name
            this.selectedCountryName = this.countries[selectedCountryId]['name'];
            // render list of states
            const getStatesUrl = 'https://www.universal-tutorial.com/api/states/' + this.selectedCountryName;
            axios.get(getStatesUrl, {
                headers: {
                    "Authorization": "Bearer " + this.authToken,
                    "Accept": "application/json"
                }
            })
            .then(response => this.displayStates(response));
        },
        selectedStateId: function (selectedStateId) {
            this.cities = [];
            const noCityText = document.getElementById('noCitiesText');
            noCityText.innerHTML = '';
            this.selectedStateName = this.states[selectedStateId]['name'];
            const getCitiesUrl = 'https://www.universal-tutorial.com/api/cities/' + this.selectedStateName;
            axios.get(getCitiesUrl, {
                headers: {
                    "Authorization": "Bearer " + this.authToken,
                    "Accept": "application/json"
                }
            })
            .then(response => this.examineResponse(response))
            .then(response => this.displayCities(response));
        }
    },
    methods: {
        examineResponse(response) {
            const loadingCityIcon = document.getElementById('loadingCityIcon');
            const noCityText = document.getElementById('noCitiesText');
            if (response.data == 0) {
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
        displayCountries(authToken) {
            // render list of countries
            const getCountriesUrl = 'https://www.universal-tutorial.com/api/countries/';
            axios.get(getCountriesUrl, {
                headers: {
                    "Authorization": "Bearer " + authToken,
                    "Accept": "application/json"
                }
            })
            // populate list of countries
            .then(response => {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    this.countries.push({
                        id: i, name: data[i]['country_name']
                    })
                }
            })
        },
        displayStates(response){
            this.selectedStateId = '';
            // populate list of states
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                this.states.push({
                    id: i, name: data[i]['state_name']
                })
            }
        },
        displayCities(response){
            this.selectedCityId = '';
            // populate list of countries
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                this.cities.push({
                    id: i, name: data[i]['city_name']
                })
            }
        },
        clearValues(){
            this.selectedCountryId = '';
            this.selectedStateId = '';
            const noCityText = document.getElementById('noCitiesText');
            noCityText.innerHTML = '';
        }
    }
})






