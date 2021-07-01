import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';

@Injectable()
export class ConversationService {

  private channel = new Subject<string>();

  public static createChannel(user1: string, user2: string): string {
    let combined: string = '';
    //combined = user1 + user2;
    if (user1 < user2) {
      combined = user1 + user2;
    } else {
      combined = user2 + user1;
    }

    return Md5.hashStr(combined).toString();
    //return combined;
  }

  refreshChannel(channel: string) {
    this.channel.next(channel);
  }

  removeChannel() {
    this.channel.next();
  }

  getChannel(): Observable<any> {
    return this.channel.asObservable();
  }
}