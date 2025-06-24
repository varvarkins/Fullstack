Write-Host "Тест API кошачьего пинтереста..." -ForegroundColor Green

#регаем юзера
Write-Host "`n1. Тест..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/user" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"login":"testuser","password":"testpass"}' -UseBasicParsing
    $token = $response.Headers["X-Auth-Token"]
    Write-Host "✅" -ForegroundColor Green
    Write-Host "токен: $token" -ForegroundColor Cyan
} catch {
    Write-Host "❌: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

#пожилой лайк
Write-Host "`n2. Тест..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/likes" -Method POST -Headers @{"Content-Type"="application/json"; "Authorization"="Bearer $token"} -Body '{"cat_id":"test-cat-123"}' -UseBasicParsing
    Write-Host "✅" -ForegroundColor Green
} catch {
    Write-Host "❌: $($_.Exception.Message)" -ForegroundColor Red
}

#список лайков
Write-Host "`n3. Тест..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/likes" -Method GET -Headers @{"Authorization"="Bearer $token"} -UseBasicParsing
    $likes = $response.Content | ConvertFrom-Json
    Write-Host "✅" -ForegroundColor Green
    Write-Host "Количество лайков: $($likes.data.Count)" -ForegroundColor Cyan
} catch {
    Write-Host "❌: $($_.Exception.Message)" -ForegroundColor Red
}

#del лайка
Write-Host "`n4. Тест..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/likes/test-cat-123" -Method DELETE -Headers @{"Authorization"="Bearer $token"} -UseBasicParsing
    Write-Host "✅" -ForegroundColor Green
} catch {
    Write-Host "❌: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nтесты пройдены" -ForegroundColor Green