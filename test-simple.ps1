Write-Host "чекинг api..." -ForegroundColor Green

try {
    $body = @{
        login = "testuser"
        password = "testpass"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/user" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅юзер создан" -ForegroundColor Green
    Write-Host "Ответ: $($response | ConvertTo-Json)" -ForegroundColor Cyan
} catch {
    Write-Host "❌: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Статус: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
} 