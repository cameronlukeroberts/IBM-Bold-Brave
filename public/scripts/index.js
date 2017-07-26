class Module
{
  constructor(n, p, c)
  {
    this.name = n;
    this.points = p;
    this.completed = c;
  }
}

function changeMiddleColumn(nmod)
{
  var newHtml = "";

  for(var i=0; i<modulesMat[nmod].length; i++)
  {
    newHtml += "<ul class='list-group'>";
    newHtml += "<a href='#' style='text-decoration: none;'>";
    //<li class="list-group-item <% if(i == 1){ %> list-group-item-success <% }else{ %> list-group-item-info <%} %>"> <div align="center"> modulo <%= i %> </div> </li>

    newHtml += "<li class='list-group-item ";
    if(modulesMat[nmod][i].completed)
     newHtml += "list-group-item-success'>";
    else
     newHtml += "list-group-item-info'>";

    newHtml += "<div align='center'>"+modulesMat[nmod][i].name+"</div>";

    newHtml += "</li>";
    newHtml += "</a>";
    newHtml += "</ul>";
  }

  document.getElementById("modulesTitle").innerHTML = "Current level: "+(nmod+1);
  document.getElementById("modulesList").innerHTML = newHtml;
}
