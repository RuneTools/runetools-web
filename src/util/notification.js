const SUPPORTED = 'serviceWorker' in navigator && 'Notification' in window;

export function sendNotification(title, props) {
    if (SUPPORTED && Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(registration => {
            registration.showNotification(title, props);
        });
    }
};
