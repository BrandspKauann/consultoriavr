# ============================================
# Script para Criar Usuário Admin no Supabase
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Criar Usuário Admin no Supabase" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# CONFIGURAÇÕES
$SUPABASE_URL = "https://cpejrontfflbzmssomnr.supabase.co"
$EMAIL = "marketingkauann@gmail.com"
$PASSWORD = "Balboal.10"

# Pedir Service Role Key
Write-Host "Para criar o usuário, você precisa da SERVICE_ROLE_KEY." -ForegroundColor Yellow
Write-Host ""
Write-Host "Como pegar:" -ForegroundColor Yellow
Write-Host "1. Acesse: https://supabase.com/dashboard/project/cpejrontfflbzmssomnr" -ForegroundColor White
Write-Host "2. Vá em: Settings → API" -ForegroundColor White
Write-Host "3. Copie a 'service_role' key (NÃO a anon key!)" -ForegroundColor White
Write-Host ""
$SERVICE_ROLE_KEY = Read-Host "Cole sua SERVICE_ROLE_KEY aqui"

if ([string]::IsNullOrWhiteSpace($SERVICE_ROLE_KEY)) {
    Write-Host "❌ Service Role Key não fornecida. Abortando." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Criando usuário admin..." -ForegroundColor Yellow
Write-Host "Email: $EMAIL" -ForegroundColor White
Write-Host ""

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
} | ConvertTo-Json -Depth 10

# Headers
$headers = @{
    "apikey" = $SERVICE_ROLE_KEY
    "Authorization" = "Bearer $SERVICE_ROLE_KEY"
    "Content-Type" = "application/json"
}

# Criar usuário
try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -ErrorAction Stop
    
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "✅ USUÁRIO CRIADO COM SUCESSO!" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Email: $EMAIL" -ForegroundColor Green
    Write-Host "ID: $($response.id)" -ForegroundColor Green
    Write-Host "Email Confirmado: $($response.email_confirmed_at)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Agora você pode fazer login em:" -ForegroundColor Yellow
    Write-Host "http://localhost:8081/admin/login" -ForegroundColor Cyan
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Red
    Write-Host "❌ ERRO AO CRIAR USUÁRIO" -ForegroundColor Red
    Write-Host "============================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Mensagem de erro:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    
    if ($_.ErrorDetails.Message) {
        $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "Detalhes:" -ForegroundColor Red
        Write-Host $errorDetails.message -ForegroundColor Red
        Write-Host ""
    }
    
    Write-Host "Verifique:" -ForegroundColor Yellow
    Write-Host "1. Se a SERVICE_ROLE_KEY está correta" -ForegroundColor White
    Write-Host "2. Se o email já não está cadastrado" -ForegroundColor White
    Write-Host "3. Se há conexão com a internet" -ForegroundColor White
    Write-Host ""
}

Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

