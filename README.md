<h1> Select Location Dropdown Component <h1>


<h2> Usage </h2>
<p> Reusable Vue Dropdown Component, Enabling User to Select a Location </p>


<h2> Getting Started </h2>
<p> Import/Download CSS from the Styles Directory </p>


<p> Add the following Scripts to your HEAD tag </p>
```
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```


<p> Add the following Scripts above your ending BODY tag </p>
```
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
  <script
      src="https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.js"></script>
  <script
      src="https://unpkg.com/multiple-select@1.5.2/dist/multiple-select-vue.min.js"></script>
```



<<<<<<< HEAD
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

<h3> Copy/Paste JS, Add API Token & E-Mail </h3>
<p> API Token can be retrieved <a href=""> here </a> </p>
```


```



 <h2> Resources </h2>

 <ol>
   <li><a href="">Axios</a></li>
  <li><a href="">Universal REST API for Countries, States & Cities</a></li>
  <li><a href="">Multiple Select Vue Dropdown Component </a></li>
 </ol>
=======
<span>View <a target="_blank" href="https://imthatalex-vue-dropdown-v1.netlify.app/">Here</a></span>

```
  funciton test() {
    console.log('hello world');
  } 

```
>>>>>>> eb1a9a3f724f2440611e85dff0b62b215606c4e2
