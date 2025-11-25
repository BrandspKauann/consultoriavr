# Script PowerShell para criar usuário diretamente no Supabase
# Execute este script no PowerShell

$SUPABASE_URL = "https://cpejrontfflbzmssomnr.supabase.co"
$SUPABASE_KEY = "sb_publishable_3DT42kOTvybQJlBfSA5-ww_OkzlEzil"
$EMAIL = "marketingkauann@gmail.com"
$PASSWORD = "Balboal.10"

Write-Host "🔐 Criando usuário no Supabase..." -ForegroundColor Cyan
Write-Host "URL: $SUPABASE_URL" -ForegroundColor Gray
Write-Host "Email: $EMAIL" -ForegroundColor Gray
Write-Host ""

# Gerar hash SHA-256 da senha usando .NET
function Get-SHA256Hash {
    param([string]$InputString)
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($InputString)
    $hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
    $hashString = ($hash | ForEach-Object { $_.ToString("x2") }) -join ""
    return $hashString
}

try {
    # Gerar hash da senha
    Write-Host "🔄 Gerando hash da senha..." -ForegroundColor Yellow
    $passwordHash = Get-SHA256Hash -InputString $PASSWORD
    Write-Host "✅ Hash gerado: $($passwordHash.Substring(0, 20))..." -ForegroundColor Green
    Write-Host ""

    # Preparar dados para inserção
    $body = @{
        email = $EMAIL.ToLower().Trim()
        password_hash = $passwordHash
        role = "admin"
        active = $true
    } | ConvertTo-Json -Depth 10

    # Headers
    $headers = @{
        "apikey" = $SUPABASE_KEY
        "Authorization" = "Bearer $SUPABASE_KEY"
        "Content-Type" = "application/json"
        "Prefer" = "return=representation"
    }

    # URL da API
    $url = "$SUPABASE_URL/rest/v1/login"

    Write-Host "🔄 Tentando criar usuário..." -ForegroundColor Yellow

    # Tentar inserir
    try {
        $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -ErrorAction Stop
        Write-Host "✅ USUÁRIO CRIADO COM SUCESSO!" -ForegroundColor Green
        Write-Host "ID: $($response.id)" -ForegroundColor Green
        Write-Host "Email: $($response.email)" -ForegroundColor Green
        Write-Host "Role: $($response.role)" -ForegroundColor Green
        Write-Host ""
        Write-Host "✅ Agora você pode fazer login em: http://localhost:8081/admin/login" -ForegroundColor Cyan
    } catch {
        $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
        
        if ($_.Exception.Response.StatusCode -eq 409 -or $errorDetails.message -like "*duplicate*" -or $errorDetails.message -like "*unique*") {
            Write-Host "⚠️  Usuário já existe. Tentando atualizar..." -ForegroundColor Yellow
            
            # Tentar atualizar
            $updateUrl = "$SUPABASE_URL/rest/v1/login?email=eq.$($EMAIL.ToLower().Trim())"
            $updateBody = @{
                password_hash = $passwordHash
                active = $true
            } | ConvertTo-Json -Depth 10
            
            try {
                $updateResponse = Invoke-RestMethod -Uri $updateUrl -Method Patch -Headers $headers -Body $updateBody -ErrorAction Stop
                Write-Host "✅ USUÁRIO ATUALIZADO COM SUCESSO!" -ForegroundColor Green
                Write-Host "Email: $($updateResponse.email)" -ForegroundColor Green
                Write-Host ""
                Write-Host "✅ Agora você pode fazer login em: http://localhost:8081/admin/login" -ForegroundColor Cyan
            } catch {
                Write-Host "❌ ERRO ao atualizar usuário:" -ForegroundColor Red
                Write-Host $_.Exception.Message -ForegroundColor Red
                if ($_.ErrorDetails.Message) {
                    Write-Host $_.ErrorDetails.Message -ForegroundColor Red
                }
                Write-Host ""
                Write-Host "💡 Tente usar o script TESTAR_CONEXAO.html no navegador" -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ ERRO ao criar usuário:" -ForegroundColor Red
            Write-Host $_.Exception.Message -ForegroundColor Red
            if ($_.ErrorDetails.Message) {
                Write-Host $_.ErrorDetails.Message -ForegroundColor Red
            }
            Write-Host ""
            Write-Host "💡 Verifique:" -ForegroundColor Yellow
            Write-Host "   1. Se a tabela 'login' existe no Supabase" -ForegroundColor Yellow
            Write-Host "   2. Se as políticas RLS estão configuradas" -ForegroundColor Yellow
            Write-Host "   3. Se a chave do Supabase está correta" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "💡 Tente usar o script TESTAR_CONEXAO.html no navegador" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "❌ ERRO GERAL:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Tente usar o script TESTAR_CONEXAO.html no navegador" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

