self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || '🔔 سیستم ویتو';
    const options = {
        body: data.body || 'یادآوری کوئست',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
        lang: 'fa',
        dir: 'rtl',
        tag: data.tag || 'vito-quest',
        renotify: false,
        vibrate: [200, 100, 200],
        actions: [
            { action: 'done', title: '✅ انجام شد' },
            { action: 'later', title: '⏳ بعداً' }
        ],
        data: {
            questId: data.questId || null
        }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const action = event.action;
    const questId = event.notification.data.questId;

    if (action === 'done' && questId) {
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
                clientList.forEach(client => {
                    client.postMessage({ action: 'completeQuest', questId: questId });
                });
            })
        );
    } else {
        event.waitUntil(clients.openWindow('/vito-system-level-up'));
    }
});
