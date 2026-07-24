self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || '🔔 سیستم ویتو';
    const options = {
        body: data.body || 'یادآوری کوئست',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
