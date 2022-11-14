import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  data = 'https://reqres.in/api/users?page=2';
  currentUser = new Subject<any>()
  usersOnLine = new Subject <any>()
  allMessagesSent = new Subject()
  allMessagesReceived = new Subject()
  urlAllMessage = `${environment.API_URL}api/messages/friendmessages`;
  _apiUrl = `${environment.API_URL}api/users`;


  constructor(private http: HttpClient, private router: Router, private socket: Socket) { }

  //Méthode pour récupérer des users au hasard via une API
  getUsers(): Observable<any> {
    return this.http.get(this.data)
  }

  //Méthode pour remplir le formulaire d'enregistrement
  register(formUser: any): Observable<any> {
    return this.http.post(this._apiUrl + "/register", formUser)
  }

  //Méthode pour se connecter, se loger
  login(formUser: any): Observable<any> {
    return this.http.post(this._apiUrl + "/login", formUser)
  }

  //Méthode pour récupérer mes infos de mon profil et les mettre dans le component profil
  getProfil(): Observable<any> {
    return this.http.get(this._apiUrl + "/profile")
  }

  //!===============DEBUT TOKEN==============
  //Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token')
  }

  //Méhode qui supprime le token pour la déconnexion Log out dans l'overview
  clearToken() {
    localStorage.removeItem('token')
    this.router.navigate((['/login']))
  }
  //!================FIN TOKEN==============

  //!===============DEBUT FRIEND==============
  //Méthode qui permet d'ajouter un ami
  addFriendService(user: any): Observable<any> {
    return this.http.post(this._apiUrl + "/addfriend", { friendName: user.username })
  }

  //Méthode qui permet de supprimer un ami
  removeFriendService(user: any): Observable<any> {
    return this.http.post(this._apiUrl + "/removefriend", { friendName: user.username })
  }

  //Méthode qui récupère la liste de mes amis
  getFriendsList(): Observable<any> {
    return this.http.get(`${this._apiUrl}/friends`, { observe: 'response' })
  }
  //!===============FIN FRIEND==============

  //!===============DEBUT USER ==============
  //Méthode qui récupère la liste de tous les utilisateurs
  getUsersList(): Observable<any> {
    return this.http.get(`${this._apiUrl}/list`, { observe: 'response' })
  }

  //Méthode qui récupère l'utilisateur sélectionné
  getUserCurrent(): Observable<any> {
    return this.currentUser.asObservable()
  }

  setUserCurrent(user: any) {
    this.currentUser.next(user)
  }
  //!================FIN USER ==============

  //!================DEBUT DISCUSSION ==============
  //Méthode qui permet d'initaliser les conversations
  initDiscussion(msg: string) {
    this.socket.emit('login', { token: this.getToken() })
  }
  //!================FIN DISCUSSION ==============

  //!===============DEBUT MSG ENVOYES==============
  //Méthode qui envoie mes messages
  sendMessage(data: any, message: string) {
    this.socket.emit('send friend message', { friendName: data.username, content: message })
  }

  //Méthode qui confirme/écoute que mes messages ont bien été envoyés
  confirmMessagesSent() {
    this.socket.on('friend message sent', (data: any) => {
      this.allMessagesSent.next(data)
    })
  }

  //Méhode qui récupère mon messages envoyé à une personne concernée
  confirmMessageSubject(): Observable<any> {
    return this.allMessagesSent.asObservable()
  }

  //Méthode qui récupère les messages que j'ai envoyé à mes friends dans la BDD pour l'historique
  newGetFriendMessage(user:any): Observable<any> {
    return this.http.get(this.urlAllMessage + "/" + user)
  }

  //!================FIN MSG ENVOYES==============

  //!===============DEBUT MSG RECUS==============
  //Méthode qui récupère les messages que mes friends m'ont envoyés quand on est en ligne
  getMsgOnline() {
    this.socket.on('friend message', (message: any) => {
      this.allMessagesReceived.next(message)
      return message
    })
  }

  //Méhode qui récupère le message reçu de la personne concernée
  getMsgSubject(): Observable<any> {
    return this.allMessagesReceived.asObservable()
  }
  //!================FIN MSG RECUS==============


   //!===============DEBUT USER EN LIGNE==============
  //Méthode qui récupère les utilisateurs en ligne
  onlineUser():void {
    this.socket.on('users list', (users: any) => {
      this.usersOnLine.next(users)
    })
  }

getOnlineUser():Observable<any>{
  return this.usersOnLine.asObservable()
}

  //!================FIN USER EN LIGNE==============

  






  

}

