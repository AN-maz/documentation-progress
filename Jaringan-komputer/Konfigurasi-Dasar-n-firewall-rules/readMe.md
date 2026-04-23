# MikroTik Basic Setup & Firewall Configuration
Dokumen ini berisi langkah-langkah konfigurasi dasar router MikroTik, mulai dari setup interface, IP address, DHCP, NAT, hingga konfigurasi firewall sesuai kebutuhan (blokir website, filter protokol, pembatasan akses, dan time-based rule).

## Topologi Sederhana
ether1 → INTERNET (WAN)
ether2 → CLIENT (LAN)
Network LAN: 192.168.xx.0/24

## Setup VM

### VM Mikrotik 
Di network setup ethernya 
- ether1 : NAT
- ether2 : internal network
- ether3 : Host bridge Adapter

### VM Client (windows 10)
Di network setup ethernya 
- ether1 : internal network


---
## Setup DHCP

- Rename Interface
Masuk ke menu Interfaces, lalu rename:

    `ether1` → `client1-INTERNET`

    `ether2` → `client2-CLIENT`

- IP Address
Masuk ke IP > Addresses:

    192.168.xx.1/24 → interface client2-CLIENT

- DHCP Client (Internet)
Masuk ke IP > DHCP Client:
    - Interface: client1-INTERNET
    - Klik OK

- NAT (Internet Sharing)
Masuk ke IP > Firewall > NAT:
    Tambahkan rule:
    - Chain: srcnat
    - Out Interface: client1-INTERNET
    - Action: masquerade

- DHCP Server (Client)
Masuk ke IP > DHCP Server:

    Klik DHCP Setup
    - Interface: client2-CLIENT
    - Klik Next sampai selesai

- DNS Configuration

    Masuk ke IP > DNS:
    - Server: 
        8.8.8.8
        8.8.4.4
    - Centang: `Allow Remote Requests`

--- 

## Firewall Configuration

### 1. Blokir Website (Facebook & YouTube)

a. DNS Static

Masuk ke IP > DNS > Static:

Tambahkan:

    facebook.com → 127.0.0.1
    Regexp: .*facebook\.com

    facebook.com → ::1 (Type: AAAA)

    youtube.com → 127.0.0.1
    Regexp: .*youtube\.com

    youtube.com → ::1 (Type: AAAA)

b. Firewall Rules

    Masuk ke IP > Firewall > Filter Rules:
        - Blokir HTTPS (TLS Host):
            - Chain: forward
            - Protocol: tcp
            - TLS Host: *facebook.com*
            - Action: drop
            - Chain: forward
            - Protocol: tcp
            - TLS Host: *youtube.com*
            - Action: drop
        - Blokir QUIC (HTTP/3):
            - Protocol: udp
            - Port: 443
            - Action: drop

### 2. Filter Protokol
    - Izinkan Web:
        - Port: 80,443
        - Action: accept
    - Blokir FTP:
        Port: 21
        Action: drop
    - Blokir Telnet:
        - Port: 23
        - Action: drop

### 3. Batasi Akses Winbox
Izinkan hanya IP tertentu:
    - Chain: input
    - Src Address: 192.168.xx.xxx
    - Port: 8291
    - Action: accept
Blokir lainnya:
    - Chain: input
    - Port: 8291
    - Action: drop

### 4. Blokir Ping Berdasarkan Waktu
    Rules:
        - Chain: input
        - Protocol: icmp
        - Action: drop
    Tab Extra:
        - Time: 12:00:00 - 13:00:00

---

## Testing
    Setelah konfigurasi:
        - Cek internet di client
        - coba:
            - ftp 8.8.8.8  → harus gagal
            - telnet 8.8.8.8 23 → harus gagal
        - Coba akses:
            - facebook.com → harus terblokir
            - youtube.com → harus terblokir
        - Coba ping router saat jam 12:00–13:00 → harus gagal
        - Coba login Winbox dari IP selain yang diizinkan → harus ditolak