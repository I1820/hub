/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 26-06-2017
 * |
 * | File Name:     client.js
 * +===============================================
 */
import { connect, Client } from 'mqtt';
import { EventEmitter } from 'events';

interface State {
  at: Date;
  value: any;
}

interface Message {
  [key: string]: State;
}

/**
 * I1820Client represents a thing in I1820 platform
 * it must have a key and an identification from I1820
 * that are provided by user in constructor.
 */
export class I1820Client extends EventEmitter {
  /**
   * device identification
   */
  private id: string;

  /**
   * device access key
   */
  private key: string

  private client: Client;

  constructor (url: string, id: string, key: string) {
    super()

    this.key = key
    this.id = id

    // connects to mqtt broker
    this.client = connect(url, {
      username: this.key
    })

    // emit ready message when we are connected to broker
    this.client.on('connect', () => {
      this.emit('ready')
    })
  }

  /**
   * Log stores given states into in-memory storage.
   * states must have following structure:
   * { temperature: 10 }
   */
  public log (states: any): void {
    var message: Message = {};

    for (const state in states) {
      message[state] = {
        at: new Date(),
        value: states[state]
      }
    }
    this.client.publish(`things/${this.id}/state`, JSON.stringify(message))
  }
}
