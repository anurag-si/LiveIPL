"use client";

import { useState, useEffect } from 'react';

interface NotificationServiceProps {
  matchId?: string;
  matchTitle?: string;
  isLive?: boolean;
}

// Extend Window interface for webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export default function NotificationService({ matchId, matchTitle, isLive }: NotificationServiceProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationInterval, setNotificationInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return;
    }

    setPermission(Notification.permission);

    // Request permission if not granted
    if (Notification.permission === 'default') {
      requestPermission();
    }

    // Cleanup interval on unmount
    return () => {
      if (notificationInterval) {
        clearInterval(notificationInterval);
      }
    };
  }, []);

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        console.log('Notification permission granted!');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const playNotificationSound = () => {
    // Create a simple notification sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const startLiveNotifications = () => {
    if (permission !== 'granted') {
      requestPermission();
      return;
    }

    setIsSubscribed(true);
    
    // Simulate live match updates every 45 seconds (less frequent for better UX)
    const interval = setInterval(() => {
      sendLiveMatchNotification();
    }, 45000); // 45 seconds

    setNotificationInterval(interval);
    
    // Send first notification immediately
    sendLiveMatchNotification();
  };

  const stopLiveNotifications = () => {
    if (notificationInterval) {
      clearInterval(notificationInterval);
      setNotificationInterval(null);
    }
    setIsSubscribed(false);
  };

  const sendLiveMatchNotification = () => {
    if (permission !== 'granted') return;

    // More realistic IPL match events
    const events = [
      {
        title: '🏏 WICKET!',
        body: 'Jasprit Bumrah strikes! Rohit Sharma c Dhoni b Bumrah 45(32) - MI 67/3 (12.1)',
        tag: 'wicket'
      },
      {
        title: '🔥 FOUR!',
        body: 'Beautiful cover drive by Virat Kohli! RCB 71/3 (12.3 overs)',
        tag: 'boundary'
      },
      {
        title: '⚡ SIX!',
        body: 'Massive hit over long-on by Andre Russell! KKR 77/3 (12.5 overs)',
        tag: 'six'
      },
      {
        title: '📊 Live Update',
        body: 'MI 82/3 (13.2 overs) - Required Rate: 8.2 - 6.4 overs remaining',
        tag: 'update'
      },
      {
        title: '🎯 Strategic Timeout',
        body: 'Chennai Super Kings taking a strategic timeout - MI 89/4 (15.1 overs)',
        tag: 'timeout'
      },
      {
        title: '🏃‍♂️ RUN OUT!',
        body: 'Brilliant fielding! Hardik Pandya run out by Jadeja - MI 95/5 (16.2)',
        tag: 'runout'
      },
      {
        title: '🎾 MAIDEN OVER!',
        body: 'Excellent bowling by Rashid Khan! 6 dot balls in the 17th over',
        tag: 'maiden'
      },
      {
        title: '🔥 BACK-TO-BACK FOURS!',
        body: 'Kieron Pollard on fire! Two consecutive boundaries - MI 108/5 (17.3)',
        tag: 'boundaries'
      }
    ];

    // Pick a random event
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    
    // Play notification sound
    playNotificationSound();
    
    new Notification(randomEvent.title, {
      body: randomEvent.body,
      icon: '/IPLLOGO.jpg',
      badge: '/IPLLOGO.jpg',
      tag: randomEvent.tag,
      requireInteraction: false,
      silent: false
    });
  };

  const sendCustomNotification = (title: string, body: string) => {
    if (permission !== 'granted') {
      requestPermission();
      return;
    }

    playNotificationSound();

    new Notification(title, {
      body,
      icon: '/IPLLOGO.jpg',
      badge: '/IPLLOGO.jpg',
      tag: 'custom',
      requireInteraction: true
    });
  };

  const testNotification = () => {
    sendCustomNotification(
      '🏏 IPL Live Match Update!', 
      'Mumbai Indians vs Chennai Super Kings - Live Score: MI 45/2 (8.2 overs) - CSK needs 156 runs to win!'
    );
  };

  if (!('Notification' in window)) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">🔔 Live Match Notifications</h3>
      
      <div className="space-y-3">
        {permission === 'default' && (
          <button
            onClick={requestPermission}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Enable Notifications
          </button>
        )}

        {permission === 'granted' && !isSubscribed && (
          <button
            onClick={startLiveNotifications}
            className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Start Live Notifications
          </button>
        )}

        {permission === 'granted' && isSubscribed && (
          <div className="space-y-2">
            <div className="text-green-600 text-sm font-medium">
              ✅ Live notifications active (every 45 seconds)
            </div>
            <button
              onClick={stopLiveNotifications}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Stop Notifications
            </button>
          </div>
        )}

        {permission === 'granted' && (
          <button
            onClick={testNotification}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
          >
            Test Single Notification
          </button>
        )}

        {permission === 'denied' && (
          <div className="text-red-600 text-sm">
            ❌ Notifications blocked. Please enable them in your browser settings.
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>🔔 Get instant updates for live scores, wickets, boundaries, and match highlights!</p>
        <p>⏰ Notifications will appear every 45 seconds when live match is active.</p>
        <p>🔊 Includes sound effects for better user experience.</p>
      </div>
    </div>
  );
}
