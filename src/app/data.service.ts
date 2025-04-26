import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  startNewSession(): string {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);

    // Retrieve existing responses or initialize as an empty array
    let responses = JSON.parse(localStorage.getItem('responses') || '[]');

    // Ensure responses is an array
    if (!Array.isArray(responses)) {
      responses = [];
    }

    // Add a new session entry
    responses.push({
      sessionId,
      timestamp: new Date().toISOString(),
      data: {} // Placeholder for session-specific data
    });

    // Save updated responses back to localStorage
    localStorage.setItem('responses', JSON.stringify(responses));

    // Save the current session ID
    localStorage.setItem('sessionId', sessionId);

    return sessionId;
  }

  getSessionId(): string | null {
    return localStorage.getItem('sessionId');
  }

  storeResponse(question: string, answer: string) {
    const sessionId = localStorage.getItem('sessionId');

    if (!sessionId) {
      throw new Error('No active session found. Please start a new session.');
    }

    // Retrieve existing responses
    const responses = JSON.parse(localStorage.getItem('responses') || '[]');

    // Ensure responses is an array
    if (!Array.isArray(responses)) {
      throw new Error('Invalid responses structure in localStorage.');
    }

    // Find the current session by sessionId
    const currentSession = responses.find((session: any) => session.sessionId === sessionId);

    if (!currentSession) {
      throw new Error('Current session not found in responses.');
    }

    // Add the response to the current session's data
    currentSession.data[question] = answer;

    // Save updated responses back to localStorage
    localStorage.setItem('responses', JSON.stringify(responses));
  }

  getResponses(): any[] {
    return JSON.parse(localStorage.getItem('responses') || '[]');
  }
}

