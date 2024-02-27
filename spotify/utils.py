from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post

def get_users_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    
    else:
        return None

    


# def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
#     tokens = get_users_tokens(session_id)
#     expires_in = timezone.now() + timedelta(seconds=expires_in)
    
#     if tokens:
#         tokens.access_token = access_token
#         tokens.refresh_token = refresh_token
#         tokens.expires_in = expires_in
#         tokens.token_type = token_type
#         tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    
#     else:
#         tokens = SpotifyToken(users= session_id, access_token= access_token, refresh_token=refresh_token, token_type=token_type, expires_in=expires_in) 
#         tokens.save()

def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    if access_token is None:
        print("Access token is None")
        return
    
    if expires_in is not None:
        expires_at = timezone.now() + timedelta(seconds=expires_in)
    else:
        # Handle the case where expires_in is None
        expires_at = None
    
    tokens, _ = SpotifyToken.objects.get_or_create(user=session_id, defaults={
        'access_token': access_token,
        'token_type': token_type,
        'expires_in': expires_at,
    })
    
    # If the token already exists, update its fields
    if not _:
        tokens.access_token = access_token
        tokens.token_type = token_type
        tokens.expires_in = expires_at
    
    if refresh_token:
        tokens.refresh_token = refresh_token
    
    tokens.save()


        
        
        
def is_spotify_authenticated(session_id):
    tokens = get_users_tokens(session_id)     
    if tokens:
        expiry  = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)
        
        return True    
            
    return False  

def refresh_spotify_token(session_id):
    refresh_token = get_users_tokens(session_id).refresh_token
    
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
        
        
    }) .json()
    
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')   
    
    
    
    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)       