var routes = [
  {
    path: '/',
    url: './index.html',
  },

  {
    path: '/tabla/',
    componentUrl: './pages/tabla.html'
  },

  {
    path: '/eventos/',
    popup: {
      componentUrl: './pages/eventos.html'
    }

  },

  // Escoger partido e ver informacion del partido. 
  
  {
    path: '/escogerEquipo/',
    async: function (routeTo, routeFrom, resolve, reject) {
      app.request({
        url: './json/dataPartidos.json',
        dataType: 'json',
        success: function (data, status, xhr) {
          console.log("Peticion correcta", data);
          formPartidos = data.partidos;
          septiembre = formPartidos[0].septiembre;
          octubre = formPartidos[0].octubre;

          console.log(formPartidos);

          resolve(
            { componentUrl: './pages/escogerEquipo.html' },
            {
              context: {
                septiembre: septiembre,
                octubre: octubre
              }
            }
          );
          

        },
        error: function (xhr, status) {
          alert("error con el servidor", status);
          reject();

        }
      });
    }
  },

  {
    path: '/infoPartido/:caja/:mes/:partido',
    async: function (routeTo, routeFrom, resolve, reject) {
      console.log(routeFrom);
      var caja = routeTo.params.caja;
      var mes = routeTo.params.mes;
      var partido = routeTo.params.partido;
      
      console.log("aux", [caja],[mes],[partido]);
      resolve(
        {
          popup: {
            componentUrl: './pages/infoPartido.html'
          }

        },
        {
          context: {
            infoPartido: formPartidos[caja][mes][partido]
          }
        }
      );
    }
  },
  
  // Escoger Equipo para ver informacion del equipo

  {
    path: '/escogerEquipoInfo/',
    async: function (routeTo, routeFrom, resolve, reject) {
      app.request({
        url: './json/informacionEquipos.json',
        dataType: 'json',
        success: function (data, status, xhr) {
          console.log("Peticion correcta", data);
          formEquipos = data.Equipos;
          console.log("Variable formEquipos-->", formEquipos);
          resolve(
            { componentUrl: './pages/escogerEquipoInfo.html' },
            {
              context: {
                Equipos: formEquipos
              }
            }
          );
        },
        error: function (xhr, status) {
          console.log("error", status);
          reject();
        }
      });
    }
  },

  {
    path: '/infoEquipo/:equipo',
    async: function (routeTo, routeFrom, resolve, reject) {
      console.log(routeFrom);
      var equipo = routeTo.params.equipo;
      console.log("infoequipo", formEquipos[equipo]);
      resolve(
        {
          popup: {
            componentUrl: './pages/infoEquipo.html'
          }

        },
        {
          context: {
            infoEquipo: formEquipos[equipo]
          }
        }
      );
    }
  },

  {
    path: '/infoJugadores/',
    async: function (routeTo, routeFrom, resolve, reject) {
      console.log(routeFrom);
      var equipo = routeFrom.params.equipo;
      console.log("infojugadores", formEquipos[equipo].Jugadores);
      resolve(
        {
          popup: {
            componentUrl: './pages/infoJugadores.html'
          }
        },
        {
          context: {
            infoJugadores: formEquipos[equipo].Jugadores
          }
        }
      );
    }
  },

  {
    path: '/simulator/',
    componentUrl: './pages/simulator.html'
  },

  {
    path: '/simulator2/',
    componentUrl: './pages/simulator2.html'
  },

  {
    path: '/vistas/',
    url: './pages/vistas.html'
  },

  {
    path: '/contenido-left-1/',
      componentUrl: './pages/contenido-left-1.html',        
  },

  {
    path: '/contenido-left-2/',
      componentUrl: './pages/contenido-left-2.html',        
  },



  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
