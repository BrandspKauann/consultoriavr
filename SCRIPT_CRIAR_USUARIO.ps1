# Script PowerShell para criar usuário admin no Supabase
# Execute este script no PowerShell

# CONFIGURAÇÕES
$SUPABASE_URL = "https://cpejrontfflbzmssomnr.supabase.co"
$SERVICE_ROLE_KEY = "COLE_SUA_SERVICE_ROLE_KEY_AQUI"
$EMAIL = "marketingkauann@gmail.com"
$PASSWORD = "Balboal.10"

# URL da API Admin
$url = "$SUPABASE_URL/auth/v1/admin/users"

# Corpo da requisição
$body = @{
    email = $EMAIL
    password = $PASSWORD
    email_confirm = $true
    user_metadata = @{
        role = "admin"
    }
} | ConvertTo-Json

# Headers
$headers = @{
    "apikey" = $SERVICE_ROLE_KEY
    "Authorization" = "Bearer $SERVICE_ROLE_KEY"
    "Content-Type" = "application/json"
}

# Criar usuário
try {
    Write-Host "Criando usuário admin..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
    Write-Host "✅ Usuário criado com sucesso!" -ForegroundColor Green
    Write-Host "Email: $EMAIL" -ForegroundColor Green
    Write-Host "ID: $($response.id)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao criar usuário:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host $_.ErrorDetails.Message -ForegroundColor Red
    }
}

# INSTRUÇÕES:
# 1. Pegue sua SERVICE_ROLE_KEY em: Supabase Dashboard → Settings → API
# 2. Substitua "COLE_SUA_SERVICE_ROLE_KEY_AQUI" pela sua chave
# 3. Execute o script no PowerShell: .\SCRIPT_CRIAR_USUARIO.ps1
# 4. OU copie e cole o conteúdo no PowerShell

