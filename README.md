<h1> Select Location Dropdown Component <h1>

<h2> Usage </h2>
<p> Reusable Vue Dropdown Component, Enabling User to Select a Location </p>

<h2> Getting Started </h2>
<p> Download CSS from the <a href="https://github.com/imthatalex/vue-dropdown-component/tree/master/Styles">Styles</a> Directory </p>

<p> Add the following CDN to your HEAD tag </p>
  
```
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

<p> Add the following CDNs above your ending BODY tag </p>
  
```
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
  <script
      src="https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.js"></script>
  <script
      src="https://unpkg.com/multiple-select@1.5.2/dist/multiple-select-vue.min.js"></script>
```

<h3> Copy/Paste Template </h3>  
  
```
  <div id="app">
      <div class="container">
          <div class="outer-row">
              <div class="col">
                  <div class="row">
                      <multiple-select
                          class="fixed-width"
                          placeholder="Please Select a Country"
                          v-model="selectedCountryId">
                          <option
                              v-for="country in countries"
                              v-bind:value="country.id">{{country.name}}</option>
                      </multiple-select>
                  </div>
                  <div class="row">
                      <multiple-select
                          class="fixed-width"
                          placeholder="Please Select a State"
                          v-model="selectedStateId">
                          <option
                              v-for="state in states"
                              v-bind:value="state.id">{{state.name}}</option>
                      </multiple-select>
                  </div>
                  <div class="row">
                      <multiple-select
                          class="fixed-width"
                          placeholder="Please Select a City"
                          multiple
                          v-model="selectedCityId">
                          <option
                              v-for="city in cities"
                              v-bind:value="city.id">{{city.name}}</option>
                      </multiple-select>
                  </div>
              </div>
              <div class="row">
                  <button id="clearBttn" @click="clearValues()">Clear</button>
                  <h3 class="loadStatus" v-if="selectedCountryId &&
                      states.length == 0">Loading..</h3>
                  <h3 class="loadStatus" v-if="selectedCountryId &&
                      states.length != 0">Done!</h3>
                  <h3 id="loadingCityIcon" class="loadStatus"
                      v-if="selectedStateId &&
                      cities.length == 0">Loading..</h3>
                  <h3 id="noCitiesText" class="loadStatus"></h3>
                  <h3 class="loadStatus" v-if="selectedStateId &&
                      cities.length != 0">Done!</h3>
              </div>
          </div>
      </div>
  </div>
 ```
  
<h3> Copy/Paste JS </h3>
  
```
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
```
  
<h3> Add API Token & E-Mail </h3>                                          
<p> API Token can be retrieved <a href="https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city"> Here </a> </p>

<h2> Resources </h2>
 <ul>
   <li><a href="https://axios-http.com/">Axios</a></li>
  <li><a href="https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city">Universal REST API for Countries, States & Cities</a></li>
  <li><a href="https://multiple-select.wenzhixin.net.cn/en/">Multiple Select Vue Dropdown Component </a></li>
 </ul>
