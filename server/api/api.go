package api

import (
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

type api struct {
	router http.Handler
}

type Server interface {
	Router() http.Handler
}

func New() Server {
	a := &api{}

	r := mux.NewRouter()
	r.HandleFunc("/", a.getRoot).Methods(http.MethodGet)
	a.router = r

	return a
}

func (a *api) Router() http.Handler {
	return a.router
}

func (a *api) getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!")
}
