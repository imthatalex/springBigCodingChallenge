const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJoZXJuYW5kZXphbGV4NjM5OEBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJON2dHRl91TUJoRTBTb0E1U3BXUk1UV1V3dmkyM1dyZ2NYYzlRXzFWWWxTUjgwYjJnd2lYdFVHc0Q1MFBpb2Y4X3RBIn0sImV4cCI6MTYzMjk2NjU1NH0.QeHFqha81RjXt3H-nodQqhyS6t5ru7ipaoGICzFqa_M';


const selectComponent = Vue.component('select-component', {
    template: `#selectComponent`
})

const vm = new Vue({
    el: '#app',
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