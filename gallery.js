fetch(`https://youstart-a45b3.firebaseio.com/user.json`).then(response=>response.json())
.then(addResults);

function addResults(data){
  console.log(data);
  let htmlContent = '';
  for(var i in data) {
    var item = data[i];
    htmlContent = `<div class="col s12 m4">
          <div class="card card-panel hoverable">
            <div class="card-image">
              <img src='${item.url}'>
            </div>
            <div class="card-content">
              <p>${item.email}</p>
            </div>
          </div>
        </div>`;

    $('.row').append(htmlContent);
  }
}
