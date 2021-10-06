const selectComponent = Vue.component('select-component', {
    template: `#selectComponent`
})

const vm = new Vue({
    el: '#app',
    data: {
        authToken: '',
        picked: '',
        selectedCountry: '',
        selectedState: '',
        selectedCity: '',
        countries: [],
        states: [],
        cities: []
    },

    beforeCreate: function(){  
            axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
                headers: {
                    "Accept": "application/json",
                    "api-token": "LAuYuSfzz1cLlOW3cdOaXqF_HGmtPsByRv9zG1dvDWqKZquaTNHtV8Fm8b5GR2ZZKXc",
                    "user-email": "hernandezalex2140@gmail.com"
                }
            })
            .then(response => {
                let data = response.data;
                let authToken = data['auth_token'];
                this.authToken = authToken;
                this.displayCountries(authToken);
            });
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
                            "Authorization": "Bearer " + this.authToken,
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
                        "Authorization": "Bearer " + this.authToken,
                        "Accept": "application/json"
                    }
                }, {validateStatus: () => true})
                    .then(response => this.examineResponse(response))
                    .then(response => this.displayCities(response))
            }
        },


        methods: {

            examineResponse(response){

                console.log(response.status);

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

            displayCountries(authToken) {

                const getCountriesUrl = 'https://www.universal-tutorial.com/api/countries/';
                axios.get(getCountriesUrl, {
                    headers: {
                        "Authorization": "Bearer " + authToken,
                        "Accept": "application/json"
                    }
                })
                .then(response => {
                    const data = response.data;
                    for (let i = 0; i < data.length; i++) {
                        this.countries.push(data[i]['country_name'])
                    }
                })

                
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