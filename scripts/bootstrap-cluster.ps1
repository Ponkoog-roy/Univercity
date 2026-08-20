$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

& "$ScriptRoot\install-ingress.ps1"
& "$ScriptRoot\install-metrics-server.ps1"
& "$ScriptRoot\install-monitoring.ps1"