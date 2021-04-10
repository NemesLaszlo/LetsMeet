import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { makeAutoObservable, runInAction } from "mobx"
import { ChatComment } from "../models/comment"
import { store } from "./store"

export default class CommentStore {
    comments: ChatComment[] = []
    hubConnection: HubConnection | null = null

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if(store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_CHAT_URL + '?activityId=' + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build()
            
            this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error))

            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    })
                    this.comments = comments
                });
            })

            this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt)
                    this.comments.unshift(comment) // comment to start of of the array
                })
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values); // SendComment the method name from the api (ChatHub)
        } catch (error) {
            console.log(error);
        }
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }
}