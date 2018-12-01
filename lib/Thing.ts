/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 26-06-2017
 * |
 * | File Name:     client.js
 * +===============================================
 */
import { EventEmitter } from 'events';
import { Client, connect } from 'mqtt';

type Value = number | object | string | boolean;

interface IState {
  at: Date;
  value: Value | Value[];
}

interface IMessage {
  [key: string]: IState;
}

/**
 * Thing represents a thing in I1820 platform
 * it must have a key and an identification from I1820
 * that are provided by user in constructor.
 */
export class Thing extends EventEmitter {
  /**
   * device identification
   */
  private id: string;

  /**
   * device access key
   */
  private key: string;

  private client: Client;

  constructor(url: string, id: string, key: string) {
    super();

    this.key = key;
    this.id = id;

    // connects to mqtt broker
    this.client = connect(url, {
      username: this.key
    });

    // emit ready message when we are connected to broker
    this.client.on('connect', () => {
      this.emit('ready');
    });
  }

  /**
   * Log stores given states into in-memory storage.
   * states must have following structure:
   * { temperature: 10 }
   */
  public log(states: { [key: string]: Value | Value[] }): void {
    const message: IMessage = {};

    for (const state of Object.keys(states)) {
      message[state] = {
        at: new Date(),
        value: states[state]
      };
    }
    this.client.publish(`things/${this.id}/state`, JSON.stringify(message));
  }
}
